import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

interface IRow {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface Props {
  rows: IRow[];
}

const TABLE_HEADER = ['ID', 'Name', 'Email', 'Gender', 'Status', 'Action'];

const DataTable = ({ rows }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handlePost = (userId: number) => {
    navigate(`/posts/${userId}`);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {TABLE_HEADER.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: IRow) => {
              const { id, name, email, gender, status } = row;
              return (
                <TableRow
                  key={name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{gender}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handlePost(id);
                      }}
                    >
                      View Post
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
