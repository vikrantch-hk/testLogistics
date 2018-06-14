import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './channel.reducer';
import { IChannel } from 'app/shared/model/channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChannelDetailProps {
  getEntity: ICrudGetAction<IChannel>;
  channel: IChannel;
  match: any;
}

export class ChannelDetail extends React.Component<IChannelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { channel } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Channel [<b>{channel.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{channel.name}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/channel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/channel/${channel.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ channel }) => ({
  channel: channel.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);
