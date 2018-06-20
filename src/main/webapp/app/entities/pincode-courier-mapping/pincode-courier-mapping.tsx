import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './pincode-courier-mapping.reducer';
import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeCourierMappingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPincodeCourierMappingState {
  search: string;
}

export class PincodeCourierMapping extends React.Component<IPincodeCourierMappingProps, IPincodeCourierMappingState> {
  state: IPincodeCourierMappingState = {
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
    const { pincodeCourierMappingList, match } = this.props;
    return (
      <div>
        <h2 id="pincode-courier-mapping-heading">
          Pincode Courier Mappings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Pincode Courier Mapping
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
                <th>Routing Code</th>
                <th>Applicable For Cheapest Courier</th>
                <th>Estimated Delivery Days</th>
                <th>Pickup Available</th>
                <th>Pincode</th>
                <th>Attributes</th>
                <th>Vendor WH Courier Mapping</th>
                <th>Source Destination Mapping</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pincodeCourierMappingList.map((pincodeCourierMapping, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pincodeCourierMapping.id}`} color="link" size="sm">
                      {pincodeCourierMapping.id}
                    </Button>
                  </td>
                  <td>{pincodeCourierMapping.routingCode}</td>
                  <td>{pincodeCourierMapping.applicableForCheapestCourier ? 'true' : 'false'}</td>
                  <td>{pincodeCourierMapping.estimatedDeliveryDays}</td>
                  <td>{pincodeCourierMapping.pickupAvailable ? 'true' : 'false'}</td>
                  <td>
                    {pincodeCourierMapping.pincodeId ? (
                      <Link to={`pincode/${pincodeCourierMapping.pincodeId}`}>{pincodeCourierMapping.pincodeId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeCourierMapping.attributesId ? (
                      <Link to={`courierAttributes/${pincodeCourierMapping.attributesId}`}>{pincodeCourierMapping.attributesId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeCourierMapping.vendorWHCourierMappingId ? (
                      <Link to={`vendorWHCourierMapping/${pincodeCourierMapping.vendorWHCourierMappingId}`}>
                        {pincodeCourierMapping.vendorWHCourierMappingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pincodeCourierMapping.sourceDestinationMappingId ? (
                      <Link to={`sourceDestinationMapping/${pincodeCourierMapping.sourceDestinationMappingId}`}>
                        {pincodeCourierMapping.sourceDestinationMappingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pincodeCourierMapping.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeCourierMapping.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincodeCourierMapping.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ pincodeCourierMapping }: IRootState) => ({
  pincodeCourierMappingList: pincodeCourierMapping.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PincodeCourierMapping);
