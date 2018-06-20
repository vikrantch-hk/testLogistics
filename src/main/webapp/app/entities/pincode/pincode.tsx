import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './pincode.reducer';
import { IPincode } from 'app/shared/model/pincode.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPincodeState {
  search: string;
}

export class Pincode extends React.Component<IPincodeProps, IPincodeState> {
  state: IPincodeState = {
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
    const { pincodeList, match } = this.props;
    return (
      <div>
        <h2 id="pincode-heading">
          Pincodes
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Pincode
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
                <th>Pincode</th>
                <th>Region</th>
                <th>Locality</th>
                <th>Last Mile Cost</th>
                <th>Tier</th>
                <th>City</th>
                <th>State</th>
                <th>Zone</th>
                <th>Hub</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pincodeList.map((pincode, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pincode.id}`} color="link" size="sm">
                      {pincode.id}
                    </Button>
                  </td>
                  <td>{pincode.pincode}</td>
                  <td>{pincode.region}</td>
                  <td>{pincode.locality}</td>
                  <td>{pincode.lastMileCost}</td>
                  <td>{pincode.tier}</td>
                  <td>{pincode.cityName ? <Link to={`city/${pincode.cityId}`}>{pincode.cityName}</Link> : ''}</td>
                  <td>{pincode.stateName ? <Link to={`state/${pincode.stateId}`}>{pincode.stateName}</Link> : ''}</td>
                  <td>{pincode.zoneName ? <Link to={`zone/${pincode.zoneId}`}>{pincode.zoneName}</Link> : ''}</td>
                  <td>{pincode.hubName ? <Link to={`hub/${pincode.hubId}`}>{pincode.hubName}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pincode.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincode.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pincode.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ pincode }: IRootState) => ({
  pincodeList: pincode.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pincode);
