import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const OrderHistoryTable = (rows) => {
    const classes = useStyles();
    return (rows.rows.length > 0 &&
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Order Id</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.rows.map(row => (
                        <TableRow key={row.orderId}>
                            <TableCell align="right">{row.orderId}</TableCell>
                            <TableCell align="right">{row.orderStatus}</TableCell>
                            <TableCell align="right">{row.orderedDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
};
export default OrderHistoryTable;
