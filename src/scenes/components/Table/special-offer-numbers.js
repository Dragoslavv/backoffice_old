import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class SpecialOfferNumbersTable extends Component{
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
                sScrollY: "300px",
                pagingType: "simple",

                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=numbers-spof',
                    type: 'POST',
                    data: {
                        quarantine: this.props.data.quarantine,
                        number: this.props.data.number,
                        provider: this.props.data.provider,
                        type: this.props.data.type,
                        brand: this.props.data.brand,
                        reserved: this.props.data.reserved,
                        condition: this.props.data.condition
                    }
                },
                columns: [
                    { title: "Number"},
                    { title: "Special Offer Regions ID"},
                    { title: "Reserved"},
                    { title: "Type"},
                    { title: "Brand"},
                    { title: "Provider"},
                    { title: "Price ID"},
                    { title: "Quarantine"},
                    { title: "Special Offer Cities ID"}
                ]
            }
        );
    }

    componentDidUpdate() {

        if(this.props.search === 'click') {

            let table = $('#offer-numbers').DataTable();
            table.destroy();


            this.$elee = $(this.el);
            this.$elee.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "300px",
                    pagingType: "simple",

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=numbers-spof',
                        type: 'POST',
                        data: {
                            quarantine: this.props.data.quarantine,
                            number: this.props.data.number,
                            provider: this.props.data.provider,
                            type: this.props.data.type,
                            brand: this.props.data.brand,
                            reserved: this.props.data.reserved,
                            condition: this.props.data.condition
                        }
                    },
                    columns: [
                        { title: "Number"},
                        { title: "Special Offer Regions ID"},
                        { title: "Reserved"},
                        { title: "Type"},
                        { title: "Brand"},
                        { title: "Provider"},
                        { title: "Price ID"},
                        { title: "Quarantine"},
                        { title: "Special Offer Cities ID"}
                    ]
                }
            );
        }
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='offer-numbers' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}