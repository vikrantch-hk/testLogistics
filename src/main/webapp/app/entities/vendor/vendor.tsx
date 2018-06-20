import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './vendor.reducer';
import { IVendor } from 'app/shared/model/vendor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import ReactUploadFile from 'react-upload-file';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactExport from 'react-data-export';
export interface IVendorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IVendorState {
  search: string;
}

export class Vendor extends React.Component<IVendorProps, IVendorState> {
  state: IVendorState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

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
          toast.success('uploaded file please check after few seconds');
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
        <h2 id="vendor-heading">
          Vendors
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Vendor
          </Link>
          <ReactFileReader handleFiles={handleUploadFiles} fileTypes={'.xlsx'}>
            <button className="btn">Upload</button>
          </ReactFileReader>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput type="text" name="search" value={this.state.search} onChange={this.handleSearch} placeholder="Search" />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
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
                  <td>{vendor.name}</td>
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

const mapStateToProps = ({ vendor }: IRootState) => ({
  vendorList: vendor.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
