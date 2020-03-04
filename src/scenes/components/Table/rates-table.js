import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";
import {deleteUsers} from "../UserFunctions";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class RatesTable extends Component{
    componentDidMount() {

        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info: false,
                bProcessing: true,
                bServerSide: true,
                sProcessing: true,
                bLengthChange: false,
                bPaginate:true,
                pagingType: "simple",

                sScrollY: "400px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read_rates',
                    type: 'POST',
                    data: {
                        destination: this.props.data.destination,
                        prefix: this.props.data.prefix,
                        brand: this.props.data.brand
                    }
                },
                columns: [
                    { title: "Img",
                        data: null,
                        render: function ( data) {

                            if(data[0] !== null){

                                const graphImage = require('./../../images/flags4030/' + data[0] + '.png')

                                return '<img src="'+ graphImage +'" >';

                            } else {
                                return '';
                            }
                        }
                    },
                    { title: "Id",
                        className: 'id_rates'
                    },
                    { title: "Destination",
                        className: 'destination'
                    },
                    { title: "Prefix"},
                    { title: "MIN",
                      className: 'perCost'
                    },
                    { title: "SMS"},
                    { title: "Brand"},
                    { title: "Route"},
                    { title: "Actions",
                        targets: -1,
                        data: this.props.data.destination,
                        defaultContent:`<input type="hidden" value="`+ this.props.data.destination +`" /><p><button type="button" class="btn btn-info" id="edit-rates" ><i class="fa fa-edit"></i></button></p>`
                    }
                ]
            }
        );


        $(document).ready(() => {
            const table = $('table');

            table.on('click', '#edit-rates', function () {

                const id = $(this).parent().parent().parent();

                var get_id = {'id' : [] , 'perCost' : [] , 'destination' : [] };

                id.find('.id_rates').each(function( index,item ) {
                    get_id['id'].push(item.innerHTML);
                });

                id.find('.perCost').each(function( index,item ) {
                    get_id['perCost'].push(item.innerHTML);
                });

                id.find('.destination').each(function( index,item ) {
                    get_id['destination'].push(item.innerHTML);
                });

                PubSub.publish('perCostUpdate', get_id);

            });

        });
    }

    componentDidUpdate() {

        let table = $('#rates').DataTable();
        table.destroy();

        this.$ele = $(this.el);
        this.$ele.DataTable(
            {
                info: false,
                bProcessing: true,
                bServerSide: true,
                sProcessing: true,
                bLengthChange: false,
                bPaginate: true,
                pagingType: "simple",

                sScrollY: "400px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read_rates',
                    type: 'POST',
                    data: {
                        destination: this.props.data.destination,
                        prefix: this.props.data.prefix,
                        brand: this.props.data.brand
                    }
                },
                columns: [
                    { title: "Img",
                        data: null,
                        render: function ( data) {

                            if(data[0] !== null){

                                const graphImage = require('./../../images/flags4030/' + data[0] + '.png')

                                return '<img src="'+ graphImage +'" >';

                            } else {
                                return '';
                            }
                        }
                    },
                    { title: "Id",
                        className: 'id_rates'
                    },
                    { title: "Destination",
                      className: 'destination'
                    },
                    { title: "Prefix"},
                    { title: "MIN",
                        className: 'perCost'
                    },
                    { title: "SMS"},
                    { title: "Brand"},
                    { title: "Route"},
                    { title: "Actions",
                        targets: -1,
                        data: this.props.data.destination,
                        defaultContent:`<input type="hidden" value="`+ this.props.data.destination +`" /><p><button type="button" class="btn btn-info" id="edit-rates" ><i class="fa fa-edit"></i></button></p>`
                    }
                ]
            }
        );

    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='rates' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}