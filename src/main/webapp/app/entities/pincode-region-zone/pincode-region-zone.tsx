import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './pincode-region-zone.reducer';
import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeRegionZoneProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPincodeRegionZoneState {
  search: string;
}

export class PincodeRegionZone extends React.Component<IPincodeRegionZoneProps, IPincodeRegionZoneState> {
  state: IPincodeRegionZoneState = {
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
    const { pincodeRegionZoneList, match } = this.props;
    return (
      <div>
        <h2 id="pincode-region-zone-heading">
          Pincode Region Zones
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Pincode Region Zone
          </Link>
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
                <th>Region Type</th>
                <th>Courier Group</th>
                <th>Vendor WH Courier Mapping</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pincodeRegionZoneList.map((pincodeRegionZone, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}`} color="link" size="sm">
                      {pincodeRegionZone.id}
                    </Button>
                  </td>
                  <td>
                    {pincodeRegionZone.regionTypeName ? (
                      <Link to={`regionType/${pincodeRegionZone.regionTypeId}`}>{pincodeRegionZone.regionTypeName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeRegionZone.courierGroupName ? (
                      <Link to={`courierGroup/${pincodeRegionZone.courierGroupId}`}>{pincodeRegionZone.courierGroupName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeRegionZone.vendorWHCourierMappingId ? (
                      <Link to={`vendorWHCourierMapping/${pincodeRegionZone.vendorWHCourierMappingId}`}>
                        {pincodeRegionZone.vendorWHCourierMappingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeRegionZone.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pincodeRegionZone }: IRootState) => ({
  pincodeRegionZoneList: pincodeRegionZone.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZone);
