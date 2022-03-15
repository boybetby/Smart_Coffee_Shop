const orderModel = require('../models/order')
const  drinkModel = require('../models/drink') 
const  customerModel = require('../models/customer') 
const fs = require('fs');
const path = require('path');

//fetch customers with more than 0 order
const getCustomers = async(dataMatrix) => {
    try {
        const customers = dataMatrix.filter(e => e.orders.length>0).map(e => e._id)
        return customers
    } catch (error) {
        
    }
}

//fetch orders and format to { _id: '', customer: '', orders: [] }
const getOrders = async() => {
    try {
        let customersOrders = []
        const customers = await customerModel.find()
        for(const customer of customers) {
          const orders = await orderModel.find({
            '_id': {
              $in: customer.orders
            }
          })
          let customerOrder = {
            _id: '',
            customer: '',
            orders: []
          }
          orders.forEach(drinks => {
            drinks.drinks.forEach(drink => {
              const find = customerOrder.orders.find(a => a._id === drink.id)
              if(find) {
                    find.quantity += drink.quantity
              }
              else {
                customerOrder.orders.push(drink)
              }
            })
          })
          customerOrder.customer = customer.username
          customerOrder._id = customer._id
          customersOrders.push(customerOrder)
        }
        return customersOrders
      } catch (error) {
        console.log(error)
    }
}

//fetch all products
const getDrinks = async() => {
    try {
        const drinks = await drinkModel.find();
        return drinks
    } catch (err) {
        console.log(err)
    }
};

//create data from formated orders and products
const createDataMatrix = (data, products) => {
    const dataMatrix = data
    dataMatrix.map(user => {
        if(user.orders.length > 0){
            products.map(product => {
                const check = user.orders.find(order => order._id === product._id.toString()
                )
                if(!check){
                    const obj = {
                        _id: product._id,
                        drinkName: product.drinkName,
                        quantity: 0
                    }
                    user.orders.push(obj)
                }
            })
        }
    })
    return dataMatrix
}

//soft data by _id and format with only quantity
//data becomes 2d matrix
const createFilterDataMatrix = (dataMatrix) => {
    let filterDataMatrix = []
    dataMatrix.map(items => {
        items.orders = items.orders.sort((a, b) => (a._id < b._id) ? 1 : -1)
        const dataQuantity = []
        items.orders.map(item => {
            dataQuantity.push(item.quantity)
        })
        filterDataMatrix.push(dataQuantity)
    })
    filterDataMatrix = filterDataMatrix.filter(e => e.length > 0)
    return filterDataMatrix
}

function dotp(x, y) {
    function dotp_sum(a, b) {
      return a + b;
    }
    function dotp_times(a, i) {
      return x[i] * y[i];
    }
    return x.map(dotp_times).reduce(dotp_sum, 0);
}
function cosineSimilarity(A,B){
    var similarity = dotp(A, B) / (Math.sqrt(dotp(A,A)) * Math.sqrt(dotp(B,B)));
    return similarity;
}

//calculating 2 array distance using cosin
const createCosineSimilarityMatrix = (filterDataMatrix) => {
    //create similarity matrix using cosin 
    cosineSimilarityMatrix = []
    filterDataMatrix.map(array1 => {
        temp = []
        filterDataMatrix.map(array2 => {
            temp.push(Math.round((cosineSimilarity(array1, array2) + Number.EPSILON) *100)/100)
        })
        cosineSimilarityMatrix.push(temp)
    })
    return cosineSimilarityMatrix
}


let decor = (v, i) => [v, i];
let undecor = a => a[1];
let argsort = arr => arr.map(decor).sort().map(undecor);
Array.prototype.sum = function() {
    return (! this.length) ? 0 : this.slice(1).sum() +
        ((typeof this[0] == 'number') ? this[0] : 0);
};
function getArray(table1, table2)
{
    var i, out = [];//literal new array
    for(i=0;i<table1.length;i++)
    {
        out.push([table1[i],table2[i]]);
    }
    return out;
}

//predict score how a customer would like product
const predict = (A, u, i) => {
    const k = 2
    const user_rated_i = []
    A.map(e => {
        if(A[A.indexOf(e)][i] !== 0) {
            user_rated_i.push(A.indexOf(e))
        }
    })
    sim = []
    user_rated_i.map(e => {
        sim.push(cosineSimilarityMatrix[u][e])
    })
    a = argsort(sim).slice(-2)
    nearest_s = [ sim[a[0]], sim[a[1]] ]
    const temp = [ user_rated_i[a[0]], user_rated_i[a[1]] ]
    rating = [ A[temp[0]][i], A[temp[1]][i] ] 
    r_bar = ( rating[0]*nearest_s[0] + rating[1]*nearest_s[1] )/( nearest_s[0]+nearest_s[1] )
    return Math.round(r_bar)
}

//find score 0 of 2d matrix and predict score
const createPredictMatrix = (filterDataMatrix, cosineSimilarityMatrix) => {
    var predict_matrix = filterDataMatrix.map(function(arr) {
        return arr.slice();
    });
    for (let u = 0; u < predict_matrix.length; u++) {
        for (let i = 0; i < predict_matrix[0].length; i++) {
            if (filterDataMatrix[u][i] === 0) {
                id = i
                predict_matrix[u][i] = predict(filterDataMatrix,u,id, cosineSimilarityMatrix)
            }
        }
    }
    return predict_matrix
}

const matrixToJSON = (predictMatrix, customers) => {
    const objectJSON = []
    predictMatrix.map(array => {
        var arrayToString = JSON.stringify(Object.assign({}, array));
        var stringToJsonObject = JSON.parse(arrayToString); 
        const newJSON = {
            _id: customers[predictMatrix.indexOf(array)],
            data: stringToJsonObject
        }
        objectJSON.push(newJSON)
    })
    return objectJSON
}

//@function to start training data
const main = async(req, res) => {
    try { 
        const data = await getOrders()

        const products = await getDrinks()
    
        const dataMatrix = createDataMatrix(data, products)

        let filterDataMatrix = createFilterDataMatrix(dataMatrix)
    
        const cosineSimilarityMatrix = createCosineSimilarityMatrix(filterDataMatrix)
    
        const predictMatrix = createPredictMatrix(filterDataMatrix, cosineSimilarityMatrix)

        const customers = await getCustomers(dataMatrix)

        const matrixJSON = await matrixToJSON(predictMatrix, customers)

        try {
            fs.writeFileSync('./productRecommendation/data.json', JSON.stringify(matrixJSON));
        } catch (error) {
            console.log(error)
        }

        res.status(202).json({
            matrixJSON
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

//fetch customer's order by id
const getCustomerOrder = async(orders, customer) => {
    const products = await getDrinks()
    let customerOrder = {
    _id: '',
    customer: '',
    orders: []
    }
    orders.forEach(drinks => {
        drinks.drinks.forEach(drink => {
            const find = customerOrder.orders.find(a => a._id === drink.id)
            if(find) {
                find.quantity += drink.quantity
            }
            else {
                customerOrder.orders.push(drink)
            }
        })
    })
    customerOrder.customer = customer.username
    customerOrder._id = customer._id

    if(customerOrder.orders.length > 0){
        products.map(product => {
            const check = customerOrder.orders.find(order => order._id === product._id.toString()
            )
            if(!check){
                const obj = {
                    _id: product._id.toString(),
                    drinkName: product.drinkName,
                    quantity: 0
                }
                customerOrder.orders.push(obj)
            }
        })
    }
    customerOrder.orders = customerOrder.orders.sort((a, b) => (a._id < b._id) ? 1 : -1)
    return customerOrder
}

//find recommedation based on customer and matrix
const findRecommedation = (customerOrder, customerMatrixJSON) => {
    const productsScore = []
    customerOrder.orders.map(order => {
        if(order.quantity === 0) {
            const product = {
                _id: order._id,
                index: customerOrder.orders.indexOf(order)
            }
            productsScore.push(product)
        }
    })

    productsScore.map(e => {
        e.score = customerMatrixJSON.data[e.index]
    })

    productsScore.sort((a, b) => (a.score < b.score) ? 1 : -1)

    return productsScore.slice(0,3)
}

//@API FOR FONT-END
const getProductRecommendation = async(req, res) => {
    try {
        const _id = req.body.id

        const customer = await customerModel.findById(_id)
        const orders = await orderModel.find({
            '_id': {
                $in: customer.orders
            }
        })
        
        const customerOrder = await getCustomerOrder(orders, customer)

        const rawdata = fs.readFileSync('./productRecommendation/data.json');
        const matrixJSON = JSON.parse(rawdata);
        const customerMatrixJSON = matrixJSON.find(e => e._id === _id)

        const topRecommendation = await findRecommedation(customerOrder, customerMatrixJSON)

        const idList = []
        await topRecommendation.map(e => {
            idList.push(e._id)
        })

        const result = await drinkModel.find({
            '_id': {
              $in: idList
            }
        })

        res.status(202).json({
            success: true,
            result
        })       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = { main, getProductRecommendation }
