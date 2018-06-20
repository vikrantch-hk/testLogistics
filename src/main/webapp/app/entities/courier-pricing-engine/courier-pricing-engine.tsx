import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './courier-pricing-engine.reducer';
import { ICourierPricingEngine } from 'app/shared/model/courier-pricing-engine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierPricingEngineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICourierPricingEngineState {
  search: string;
}

export class CourierPricingEngine extends React.Component<ICourierPricingEngineProps, ICourierPricingEngineState> {
  state: ICourierPricingEngineState = {
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
    const { courierPricingEngineList, match } = this.props;
    return (
      <div>
        <h2 id="courier-pricing-engine-heading">
          Courier Pricing Engines
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Courier Pricing Engine
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
                <th>First Base Wt</th>
                <th>First Base Cost</th>
                <th>Second Base Wt</th>
                <th>Second Base Cost</th>
                <th>Additional Wt</th>
                <th>Additional Cost</th>
                <th>Fuel Surcharge</th>
                <th>Min Cod Charges</th>
                <th>Cod Cutoff Amount</th>
                <th>Variable Cod Charges</th>
                <th>Valid Upto</th>
                <th>Courier</th>
                <th>Warehouse</th>
                <th>Region Type</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {courierPricingEngineList.map((courierPricingEngine, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${courierPricingEngine.id}`} color="link" size="sm">
                      {courierPricingEngine.id}
                    </Button>
                  </td>
                  <td>{courierPricingEngine.firstBaseWt}</td>
                  <td>{courierPricingEngine.firstBaseCost}</td>
                  <td>{courierPricingEngine.secondBaseWt}</td>
                  <td>{courierPricingEngine.secondBaseCost}</td>
                  <td>{courierPricingEngine.additionalWt}</td>
                  <td>{courierPricingEngine.additionalCost}</td>
                  <td>{courierPricingEngine.fuelSurcharge}</td>
                  <td>{courierPricingEngine.minCodCharges}</td>
                  <td>{courierPricingEngine.codCutoffAmount}</td>
                  <td>{courierPricingEngine.variableCodCharges}</td>
                  <td>
                    <TextFormat type="date" value={courierPricingEngine.validUpto} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {courierPricingEngine.courierName ? (
                      <Link to={`courier/${courierPricingEngine.courierId}`}>{courierPricingEngine.courierName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {courierPricingEngine.warehouseName ? (
                      <Link to={`warehouse/${courierPricingEngine.warehouseId}`}>{courierPricingEngine.warehouseName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {courierPricingEngine.regionTypeName ? (
                      <Link to={`regionType/${courierPricingEngine.regionTypeId}`}>{courierPricingEngine.regionTypeName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${courierPricingEngine.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierPricingEngine.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierPricingEngine.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ courierPricingEngine }: IRootState) => ({
  courierPricingEngineList: courierPricingEngine.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierPricingEngine);
