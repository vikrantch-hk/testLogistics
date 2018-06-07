import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier-group.reducer';
import { ICourierGroup } from 'app/shared/model/courier-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierGroupDetailProps {
  getEntity: ICrudGetAction<ICourierGroup>;
  courierGroup: ICourierGroup;
  match: any;
}

export class CourierGroupDetail extends React.Component<ICourierGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierGroup } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierGroup [<b>{courierGroup.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{courierGroup.name}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier-group/${courierGroup.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierGroup }) => ({
  courierGroup: courierGroup.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierGroupDetail);
