import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './pincode.reducer';
import { IPincode } from 'app/shared/model/pincode.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeProps {
  getEntities: ICrudGetAllAction<IPincode>;
  pincodeList: IPincode[];
  match: any;
}

export class Pincode extends React.Component<IPincodeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { pincodeList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Pincodes
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Pincode
          </Link>
        </h2>
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

const mapStateToProps = ({ pincode }) => ({
  pincodeList: pincode.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Pincode);
