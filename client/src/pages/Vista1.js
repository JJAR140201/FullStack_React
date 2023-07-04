import { useState, useEffect } from "react";
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Vista1 = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:3001/vista1')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('No se pudo obtener los datos', error);
            });
    }, []);


    const [datos, setDatos] = useState({
        fecha_inicio: '',
        fecha_final: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.fecha_inicio + ' ' + datos.fecha_final)
        let json = { fecha_inicio: datos.fecha_inicio, fecha_final: datos.fecha_final }
        Axios.post('http://localhost:3001/vista1', json)
            .then(response => {
                console.log(response)
                setUsers(response.data);
            })
            .catch(error => {
                console.error('No se pudo obtener los datos', error);
            });
    }


    return (
        <div className="Vista1">
            <form className="row" onSubmit={enviarDatos}>
                <div className="col-md-3">
                    <input type="date" placeholder="Fecha inicio" className="form-control" onChange={handleInputChange} name="fecha_inicio"></input>
                </div>
                <div className="col-md-3">
                    <input type="date" placeholder="Fecha final" className="form-control" onChange={handleInputChange} name="fecha_final"></input>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">LineaNombre</TableCell>
                            <TableCell align="center">NombreCliente</TableCell>
                            <TableCell align="center">Consumo</TableCell>
                            <TableCell align="center">Perdida</TableCell>
                            <TableCell align="center">Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.ID}>
                                <TableCell align="center">{user.fecha}</TableCell>
                                <TableCell align="center">{user.LineaNombre}</TableCell>
                                <TableCell align="center">{user.NombreCliente}</TableCell>
                                <TableCell align="center">{user.Consumo}</TableCell>
                                <TableCell align="center">{user.Perdida}</TableCell>
                                <TableCell align="center">{user.Costo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default Vista1;