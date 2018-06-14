import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier.reducer';
import { ICourier } from 'app/shared/model/courier.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierDetailProps {
  getEntity: ICrudGetAction<ICourier>;
  courier: ICourier;
  match: any;
}

export class CourierDetail extends React.Component<ICourierDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courier } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Courier [<b>{courier.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{courier.name}</dd>
              <dt>
                <span id="active">Active</span>
              </dt>
              <dd>{courier.active ? 'true' : 'false'}</dd>
              <dt>
                <span id="trackingParameter">Tracking Parameter</span>
              </dt>
              <dd>{courier.trackingParameter}</dd>
              <dt>
                <span id="trackingUrl">Tracking Url</span>
              </dt>
              <dd>{courier.trackingUrl}</dd>
              <dt>
                <span id="parentCourierId">Parent Courier Id</span>
              </dt>
              <dd>{courier.parentCourierId}</dd>
              <dt>Courier Group</dt>
              <dd>
                {courier.courierGroups
                  ? courier.courierGroups.map((val, i) => (
                      <span key={val.id}>
                        <a>{val.name}</a>
                        {i === courier.courierGroups.length - 1 ? '' : ', '}
                      </span>
                    ))
                  : null}
              </dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier/${courier.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courier }) => ({
  courier: courier.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierDetail);
