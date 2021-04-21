import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import PubSub from "pubsub-js";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CardTransactionTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                data:this.props.data,
                pagingType: "simple",
                columns: [
                    { title: "ID"},
                    { title: "Created"},
                    { title: "User Id",
                      className: 'car_user_id'
                    },
                    { title: "User",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="card_transactions_table" ><i class="fa fa-info-circle"></i></button>`
                    },
                    { title: "Transaction Id"},
                    { title: "Amount"},
                    { title: "Currency"},
                    { title: "Status"},
                    { title: "Card Holder"},
                    { title: "Card Country"},
                    { title: "Card City"},
                    { title: "Customer IP"},
                    { title: "Card Type"}
                ]
            }
        );

        $(document).ready(() => {
            const table = $('#test_transactions');

            table.on('click', '#card_transactions_table', function () {

                const id = $(this).parent().parent();

                var get_id = { 'td' : [] };

                id.find('.car_user_id').each(function( index,item ) {
                    const cookies = new Cookies();

                    cookies.set('cardTransactions', item.innerHTML);

                    get_id['td'].push(item.innerHTML);
                });

                PubSub.publish('cardTransactions', get_id);

            });
        });
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='test_transactions' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}