import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './courier-channel.reducer';
import { ICourierChannel } from 'app/shared/model/courier-channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierChannelProps {
  getEntities: ICrudGetAllAction<ICourierChannel>;
  courierChannelList: ICourierChannel[];
  match: any;
}

export class CourierChannel extends React.Component<ICourierChannelProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { courierChannelList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Courier Channels
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Courier Channel
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Channel</th>
                <th>Courier</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {courierChannelList.map((courierChannel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${courierChannel.id}`} color="link" size="sm">
                      {courierChannel.id}
                    </Button>
                  </td>
                  <td>
                    {courierChannel.channelName ? <Link to={`channel/${courierChannel.channelId}`}>{courierChannel.channelName}</Link> : ''}
                  </td>
                  <td>
                    {courierChannel.courierName ? <Link to={`courier/${courierChannel.courierId}`}>{courierChannel.courierName}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${courierChannel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierChannel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${courierChannel.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ courierChannel }) => ({
  courierChannelList: courierChannel.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierChannel);
