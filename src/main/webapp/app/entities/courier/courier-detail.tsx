import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './courier.reducer';
import { ICourier } from 'app/shared/model/courier.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourierDetail extends React.Component<ICourierDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Courier [<b>{courierEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{courierEntity.name}</dd>
            <dt>
              <span id="active">Active</span>
            </dt>
            <dd>{courierEntity.active ? 'true' : 'false'}</dd>
            <dt>
              <span id="trackingParameter">Tracking Parameter</span>
            </dt>
            <dd>{courierEntity.trackingParameter}</dd>
            <dt>
              <span id="trackingUrl">Tracking Url</span>
            </dt>
            <dd>{courierEntity.trackingUrl}</dd>
            <dt>
              <span id="parentCourierId">Parent Courier Id</span>
            </dt>
            <dd>{courierEntity.parentCourierId}</dd>
            <dt>Courier Channel</dt>
            <dd>
              {courierEntity.courierChannels
                ? courierEntity.courierChannels.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === courierEntity.courierChannels.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Courier Group</dt>
            <dd>
              {courierEntity.courierGroups
                ? courierEntity.courierGroups.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === courierEntity.courierGroups.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/courier" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/courier/${courierEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courier }: IRootState) => ({
  courierEntity: courier.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierDetail);
