import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PackageStatTotalTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                searching: false,
                sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=grid_store',
                    type: 'POST',
                    data: {
                        start_day: this.props.data.start_day,
                        end_day: this.props.data.end_day,
                        package_id: this.props.data.package,
                        package_group_id: this.props.data.package_group,
                        free_of_charge: this.props.data.free_change
                    }
                },
                columns: [
                    { title: "Package"},
                    { title: "Group"},
                    { title: "Total"}
                ]
            }
        );
    }

    componentDidUpdate() {

        if(this.props.search === 'click') {
            let table = $('#pack_stats').DataTable();
            table.destroy();

            this.$ele = $(this.el);
            this.$ele.DataTable(
                {
                    info:false,
                    bLengthChange: false,
                    searching: false,
                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=grid_store',
                        type: 'POST',
                        data: {
                            start_day: this.props.data.start_day,
                            end_day: this.props.data.end_day,
                            package_id: this.props.data.package,
                            package_group_id: this.props.data.package_group,
                            free_of_charge: this.props.data.free_change
                        }
                    },
                    columns: [
                        { title: "Package"},
                        { title: "Group"},
                        { title: "Total"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='pack_stats' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}