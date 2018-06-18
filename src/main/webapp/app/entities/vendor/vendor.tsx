import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './vendor.reducer';
import { IVendor } from 'app/shared/model/vendor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import ReactUploadFile from 'react-upload-file';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactExport from 'react-data-export';

export interface IVendorProps {
  getEntities: ICrudGetAllAction<IVendor>;
  vendorList: IVendor[];
  match: any;
}

export class Vendor extends React.Component<IVendorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { vendorList, match } = this.props;

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const handleUploadFiles = file => {
      // tslint:disable-next-line:no-console
      console.log(file);
      // tslint:disable-next-line:no-console
      //  console.log(axios.defaults.headers.common['Authorization']);
      const data = new FormData();
      const imagedata = file[0];
      // tslint:disable-next-line:no-console
      console.log(imagedata);
      data.append('file', file[0]);
      data.append('fileName', file[0]);
      //  axios.get('api/vendor');
      // tslint:disable-next-line:no-console
      console.log('get success');
      axios
        .post('/api/upload', data)
        .then(response => {
          // tslint:disable-next-line:no-console
          console.log(response);
          toast.success(response.statusText);
          this.setState({ vendorList: this.props.getEntities() });
          this.setState({ file: null });
          this.setState({ data: null });
          file = null;
          // return response;
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.log(error);
          //  alert(error);
          toast.error(error.message);
          // return error;
          file = null;
        });
      // tslint:disable-next-line:no-console
      console.log('bye');
      // const workbook = XLSX.readFile(file);
      // tslint:disable-next-line:no-console
      console.log('workbook');
    };
    return (
      <div>
        <h2 id="page-heading">
          Vendors
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Vendor
          </Link>
          <ReactFileReader handleFiles={handleUploadFiles} fileTypes={'.xlsx'}>
            <button className="btn">Upload</button>
          </ReactFileReader>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Short Code</th>
                <th>Pincode</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vendorList.map((vendor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vendor.id}`} color="link" size="sm">
                      {vendor.id}
                    </Button>
                  </td>
                  <td>{vendor.shortCode}</td>
                  <td>{vendor.pincode}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vendor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vendor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vendor.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <ExcelFile element={<button>Download Data</button>}>
              <ExcelSheet data={vendorList} name="Vendors">
                <ExcelColumn label="Short Code" value="shortCode" />
                <ExcelColumn label="Pincode" value="pincode" />
              </ExcelSheet>
            </ExcelFile>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vendor }) => ({
  vendorList: vendor.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
