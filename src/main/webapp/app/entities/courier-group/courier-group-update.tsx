import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourier } from 'app/shared/model/courier.model';
import { getEntities as getCouriers } from 'app/entities/courier/courier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './courier-group.reducer';
import { ICourierGroup } from 'app/shared/model/courier-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICourierGroupUpdateState {
  isNew: boolean;
  courierId: number;
}

export class CourierGroupUpdate extends React.Component<ICourierGroupUpdateProps, ICourierGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courierId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCouriers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierGroupEntity } = this.props;
      const entity = {
        ...courierGroupEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/courier-group');
  };

  render() {
    const isInvalid = false;
    const { courierGroupEntity, couriers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testLogisticsApp.courierGroup.home.createOrEditLabel">Create or edit a CourierGroup</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="courier-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="courier-group-name" type="text" name="name" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier-group" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  couriers: storeState.courier.entities,
  courierGroupEntity: storeState.courierGroup.entity,
  loading: storeState.courierGroup.loading,
  updating: storeState.courierGroup.updating
});

const mapDispatchToProps = {
  getCouriers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierGroupUpdate);
