import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier-channel.reducer';
import { ICourierChannel } from 'app/shared/model/courier-channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierChannelDetailProps {
  getEntity: ICrudGetAction<ICourierChannel>;
  courierChannel: ICourierChannel;
  match: any;
}

export class CourierChannelDetail extends React.Component<ICourierChannelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierChannel } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierChannel [<b>{courierChannel.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{courierChannel.name}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier-channel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier-channel/${courierChannel.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierChannel }) => ({
  courierChannel: courierChannel.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierChannelDetail);
