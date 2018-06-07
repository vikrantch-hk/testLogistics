import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './courier-pickup-info.reducer';
import { ICourierPickupInfo } from 'app/shared/model/courier-pickup-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierPickupInfoProps {
  getEntities: ICrudGetAllAction<ICourierPickupInfo>;
  courierPickupInfoList: ICourierPickupInfo[];
  match: any;
}

export class CourierPickupInfo extends React.Component<ICourierPickupInfoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { courierPickupInfoList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Courier Pickup Infos
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Courier Pickup Info
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pickup Confirmation No</th>
                <th>Tracking No</th>
                <th>Pickup Date</th>
                <th>Courier</th>
                <th>Pickup Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {courierPickupInfoList.map((courierPickupInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${courierPickupInfo.id}`} color="link" size="sm">
                      {courierPickupInfo.id}
                    </Button>
                  </td>
                  <td>{courierPickupInfo.pickupConfirmationNo}</td>
                  <td>{courierPickupInfo.trackingNo}</td>
                  <td>
                    <TextFormat type="date" value={courierPickupInfo.pickupDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {courierPickupInfo.courierName ? (
                      <Link to={`courier/${courierPickupInfo.courierId}`}>{courierPickupInfo.courierName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {courierPickupInfo.pickupStatusName ? (
                      <Link to={`pickupStatus/${courierPickupInfo.pickupStatusId}`}>{courierPickupInfo.pickupStatusName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${courierPickupInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierPickupInfo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierPickupInfo.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ courierPickupInfo }) => ({
  courierPickupInfoList: courierPickupInfo.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierPickupInfo);
