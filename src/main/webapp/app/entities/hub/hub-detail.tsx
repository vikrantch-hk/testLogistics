import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './hub.reducer';
import { IHub } from 'app/shared/model/hub.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHubDetailProps {
  getEntity: ICrudGetAction<IHub>;
  hub: IHub;
  match: any;
}

export class HubDetail extends React.Component<IHubDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hub } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Hub [<b>{hub.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{hub.name}</dd>
              <dt>
                <span id="address">Address</span>
              </dt>
              <dd>{hub.address}</dd>
              <dt>
                <span id="country">Country</span>
              </dt>
              <dd>{hub.country}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/hub" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/hub/${hub.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hub }) => ({
  hub: hub.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(HubDetail);
