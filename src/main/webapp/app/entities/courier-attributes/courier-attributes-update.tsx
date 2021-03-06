import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './courier-attributes.reducer';
import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICourierAttributesUpdateProps {
  getEntity: ICrudGetAction<ICourierAttributes>;
  updateEntity: ICrudPutAction<ICourierAttributes>;
  createEntity: ICrudPutAction<ICourierAttributes>;
  courierAttributes: ICourierAttributes;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICourierAttributesUpdateState {
  isNew: boolean;
}

export class CourierAttributesUpdate extends React.Component<ICourierAttributesUpdateProps, ICourierAttributesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courierAttributes } = this.props;
      const entity = {
        ...courierAttributes,
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
    this.props.history.push('/entity/courier-attributes');
  };

  render() {
    const isInvalid = false;
    const { courierAttributes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-courier-attributes-heading">Create or edit a CourierAttributes</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courierAttributes} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="prepaidAirLabel" check>
                    <AvInput type="checkbox" className="form-control" name="prepaidAir" />
                    Prepaid Air
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="prepaidGroundLabel" check>
                    <AvInput type="checkbox" className="form-control" name="prepaidGround" />
                    Prepaid Ground
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="codAirLabel" check>
                    <AvInput type="checkbox" className="form-control" name="codAir" />
                    Cod Air
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="codGroundLabel" check>
                    <AvInput type="checkbox" className="form-control" name="codGround" />
                    Cod Ground
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reverseAirLabel" check>
                    <AvInput type="checkbox" className="form-control" name="reverseAir" />
                    Reverse Air
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reverseGroundLabel" check>
                    <AvInput type="checkbox" className="form-control" name="reverseGround" />
                    Reverse Ground
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cardOnDeliveryAirLabel" check>
                    <AvInput type="checkbox" className="form-control" name="cardOnDeliveryAir" />
                    Card On Delivery Air
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cardOnDeliveryGroundLabel" check>
                    <AvInput type="checkbox" className="form-control" name="cardOnDeliveryGround" />
                    Card On Delivery Ground
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="hkShippingLabel" check>
                    <AvInput type="checkbox" className="form-control" name="hkShipping" />
                    Hk Shipping
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="vendorShippingLabel" check>
                    <AvInput type="checkbox" className="form-control" name="vendorShipping" />
                    Vendor Shipping
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reversePickupLabel" check>
                    <AvInput type="checkbox" className="form-control" name="reversePickup" />
                    Reverse Pickup
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/courier-attributes" replace color="info">
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

const mapStateToProps = storeState => ({
  courierAttributes: storeState.courierAttributes.entity,
  loading: storeState.courierAttributes.loading,
  updating: storeState.courierAttributes.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierAttributesUpdate);
