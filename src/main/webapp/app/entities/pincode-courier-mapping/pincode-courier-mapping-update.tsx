import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPincode } from 'app/shared/model/pincode.model';
import { getEntities as getPincodes } from 'app/entities/pincode/pincode.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
import { getEntities as getVendorWhCourierMappings } from 'app/entities/vendor-wh-courier-mapping/vendor-wh-courier-mapping.reducer';
import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
import { getEntities as getSourceDestinationMappings } from 'app/entities/source-destination-mapping/source-destination-mapping.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pincode-courier-mapping.reducer';
import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPincodeCourierMappingUpdateProps {
  getEntity: ICrudGetAction<IPincodeCourierMapping>;
  updateEntity: ICrudPutAction<IPincodeCourierMapping>;
  createEntity: ICrudPutAction<IPincodeCourierMapping>;
  getPincodes: ICrudGetAllAction<IPincode>;
  pincodes: IPincode[];
  getVendorWhCourierMappings: ICrudGetAllAction<IVendorWHCourierMapping>;
  vendorWHCourierMappings: IVendorWHCourierMapping[];
  getSourceDestinationMappings: ICrudGetAllAction<ISourceDestinationMapping>;
  sourceDestinationMappings: ISourceDestinationMapping[];
  pincodeCourierMapping: IPincodeCourierMapping;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IPincodeCourierMappingUpdateState {
  isNew: boolean;
  pincodeId: number;
  vendorWHCourierMappingId: number;
  sourceDestinationMappingId: number;
}

export class PincodeCourierMappingUpdate extends React.Component<IPincodeCourierMappingUpdateProps, IPincodeCourierMappingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      pincodeId: 0,
      vendorWHCourierMappingId: 0,
      sourceDestinationMappingId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPincodes();
    this.props.getVendorWhCourierMappings();
    this.props.getSourceDestinationMappings();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pincodeCourierMapping } = this.props;
      const entity = {
        ...pincodeCourierMapping,
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
    this.props.history.push('/entity/pincode-courier-mapping');
  };

  pincodeUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        pincodeId: -1
      });
    } else {
      for (const i in this.props.pincodes) {
        if (id === this.props.pincodes[i].id.toString()) {
          this.setState({
            pincodeId: this.props.pincodes[i].id
          });
        }
      }
    }
  };

  vendorWHCourierMappingUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        vendorWHCourierMappingId: -1
      });
    } else {
      for (const i in this.props.vendorWHCourierMappings) {
        if (id === this.props.vendorWHCourierMappings[i].id.toString()) {
          this.setState({
            vendorWHCourierMappingId: this.props.vendorWHCourierMappings[i].id
          });
        }
      }
    }
  };

  sourceDestinationMappingUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        sourceDestinationMappingId: -1
      });
    } else {
      for (const i in this.props.sourceDestinationMappings) {
        if (id === this.props.sourceDestinationMappings[i].id.toString()) {
          this.setState({
            sourceDestinationMappingId: this.props.sourceDestinationMappings[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { pincodeCourierMapping, pincodes, vendorWHCourierMappings, sourceDestinationMappings, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-pincode-courier-mapping-heading">Create or edit a PincodeCourierMapping</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pincodeCourierMapping} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="routingCodeLabel" for="routingCode">
                    Routing Code
                  </Label>
                  <AvField type="text" name="routingCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="applicableForCheapestCourierLabel" check>
                    <AvInput type="checkbox" className="form-control" name="applicableForCheapestCourier" />
                    Applicable For Cheapest Courier
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="estimatedDeliveryDaysLabel" for="estimatedDeliveryDays">
                    Estimated Delivery Days
                  </Label>
                  <AvField type="number" className="form-control" name="estimatedDeliveryDays" />
                </AvGroup>
                <AvGroup>
                  <Label id="pickupAvailableLabel" check>
                    <AvInput type="checkbox" className="form-control" name="pickupAvailable" />
                    Pickup Available
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="pincode.id">Pincode</Label>
                  <AvInput type="select" className="form-control" name="pincodeId" onChange={this.pincodeUpdate}>
                    <option value="" key="0" />
                    {pincodes
                      ? pincodes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vendorWHCourierMapping.id">Vendor WH Courier Mapping</Label>
                  <AvInput
                    type="select"
                    className="form-control"
                    name="vendorWHCourierMappingId"
                    onChange={this.vendorWHCourierMappingUpdate}
                  >
                    <option value="" key="0" />
                    {vendorWHCourierMappings
                      ? vendorWHCourierMappings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sourceDestinationMapping.id">Source Destination Mapping</Label>
                  <AvInput
                    type="select"
                    className="form-control"
                    name="sourceDestinationMappingId"
                    onChange={this.sourceDestinationMappingUpdate}
                  >
                    <option value="" key="0" />
                    {sourceDestinationMappings
                      ? sourceDestinationMappings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/pincode-courier-mapping" replace color="info">
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
  pincodes: storeState.pincode.entities,
  vendorWHCourierMappings: storeState.vendorWHCourierMapping.entities,
  sourceDestinationMappings: storeState.sourceDestinationMapping.entities,
  pincodeCourierMapping: storeState.pincodeCourierMapping.entity,
  loading: storeState.pincodeCourierMapping.loading,
  updating: storeState.pincodeCourierMapping.updating
});

const mapDispatchToProps = {
  getPincodes,
  getVendorWhCourierMappings,
  getSourceDestinationMappings,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(PincodeCourierMappingUpdate);
