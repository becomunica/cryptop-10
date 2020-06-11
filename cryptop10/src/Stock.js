import React from 'react';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }
    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'IF0XDW6VS8AXFH7M';
        let StockSymbol = 'AMZN';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=demo=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                console.log(data);

                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)']
                    [key]['1. open']);
                }

            // console.log(stockChartXValuesFunction);
            pointerToThis.setState({
                stockChartXValues: stockChartXValuesFunction,
                stockChartYValues: stockChartYValuesFunction
            });
            }
        )
    }
    render() {
        return (
            <div>
                <h1>Hola</h1>
                <p>x-values: {this.state.stockChartXValues}</p>
                <p>y-values: {this.state.stockChartYValues}</p>
            </div>
        )
    }
}

export default Stock;