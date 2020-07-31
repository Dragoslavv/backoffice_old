import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ProcessPurchaselTable extends Component{

    componentDidMount() {
        switch (this.props.data.type) {
            case '2':

                this.$el = $(this.el);
                this.$el.DataTable(
                    {
                        info: false,
                        bProcessing: true,
                        bServerSide: true,
                        sProcessing: true,
                        bLengthChange: false,
                        bPaginate:true,
                        bScrollInfinite: true,
                        bScrollCollapse: true,
                        bOrderCellsTop: true,
                        orderCellsTop: true,
                        bFixedHeader: true,
                        fixedHeader: true,
                        sScrollY: "700px",
                        pagingType: "simple",
                        ajax: {
                            url: 'https://api.globaltel.rs/new-gui/?url=PaymentPurchase',
                            type: 'POST',
                            data:{
                                start_log: this.props.data.start,
                                end_log: this.props.data.end,
                                type: this.props.data.type
                            }
                        },
                        order: [[ 4, "desc" ]],
                        columns: [
                            { title: "id"},
                            { title: "oid"},
                            { title: "start_datetime"},
                            { title: "amount"},
                            { title: "state"},
                            { title: "chosen_package"}
                        ]
                    }
                );


                $(document).ready(function() {
                    // Setup - add a text input to each footer cell
                    $('#payment_purchase2 thead tr').clone(true).appendTo( '#payment_purchase2 thead' );
                    $('#payment_purchase2 thead tr:eq(1) th').each( function (i) {
                        var title = $(this).text();
                        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );

                        $( 'input', this ).on( 'keyup change', function () {
                            if ( table.column(i).search() !== this.value ) {
                                table
                                    .column(i)
                                    .search( this.value )
                                    .draw();
                            }
                        } );
                    } );

                    let d = $('#payment_purchase2').DataTable();
                    d.destroy();

                    var table = $('#payment_purchase2').DataTable(
                        {
                            info: false,
                            bProcessing: true,
                            bServerSide: true,
                            sProcessing: true,
                            bLengthChange: false,
                            bPaginate:true,
                            bScrollInfinite: true,
                            bScrollCollapse: true,
                            bOrderCellsTop: true,
                            orderCellsTop: true,
                            bFixedHeader: true,

                            fixedHeader: true,
                            sScrollY: "700px",
                            pagingType: "simple",
                            ajax: {
                                url: 'https://api.globaltel.rs/new-gui/?url=PaymentPurchase',
                                type: 'POST',
                                data:{
                                    start_log: this.props.data.start,
                                    end_log: this.props.data.end,
                                    type: this.props.data.type
                                }
                            },
                            order: [[ 4, "desc" ]],
                            columns: [
                                { title: "id"},
                                { title: "oid"},
                                { title: "start_datetime"},
                                { title: "amount"},
                                { title: "state"},
                                { title: "chosen_package"}
                            ]
                        }
                    );
                } );

                break;
        }
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    componentDidUpdate() {

        switch (this.props.data.type) {
            case '2':

                if(this.props.search === 'click'){

                    let table = $('#payment_purchase2').DataTable();
                    table.destroy();

                    this.$ele = $(this.el);
                    this.$ele.DataTable(
                        {
                            info: false,
                            bProcessing: true,
                            bServerSide: true,
                            sProcessing: true,
                            bLengthChange: false,
                            bPaginate:true,
                            bScrollInfinite: true,
                            bScrollCollapse: true,
                            sScrollY: "700px",
                            pagingType: "simple",
                            ajax: {
                                url: 'https://api.globaltel.rs/new-gui/?url=PaymentPurchase',
                                type: 'POST',
                                data:{
                                    start_log: this.props.data.start,
                                    end_log: this.props.data.end,
                                    type: this.props.data.type
                                }
                            },
                            order: [[ 4, "desc" ]],
                            columns: [
                                { title: "id"},
                                { title: "oid"},
                                { title: "start_datetime"},
                                { title: "amount"},
                                { title: "state"},
                                { title: "chosen_package"}
                            ]
                        }
                    );

                }

                break;
        }

    }

    render() {

        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='payment_purchase2' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}