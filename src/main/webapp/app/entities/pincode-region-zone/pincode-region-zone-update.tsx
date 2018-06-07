import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRegionType } from 'app/shared/model/region-type.model';
import { getEntities as getRegionTypes } from 'app/entities/region-type/region-type.reducer';
import { ICourierGroup } from 'app/shared/model/courier-group.model';
import { getEntities as getCourierGroups } from 'app/entities/courier-group/courier-group.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
import { getEntities as getVendorWhCourierMappings } from 'app/entities/vendor-wh-courier-mapping/vendor-wh-courier-mapping.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pincode-region-zone.reducer';
import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPincodeRegionZoneUpdateProps {
  getEntity: ICrudGetAction<IPincodeRegionZone>;
  updateEntity: ICrudPutAction<IPincodeRegionZone>;
  createEntity: ICrudPutAction<IPincodeRegionZone>;
  getRegionTypes: ICrudGetAllAction<IRegionType>;
  regionTypes: IRegionType[];
  getCourierGroups: ICrudGetAllAction<ICourierGroup>;
  courierGroups: ICourierGroup[];
  getVendorWhCourierMappings: ICrudGetAllAction<IVendorWHCourierMapping>;
  vendorWHCourierMappings: IVendorWHCourierMapping[];
  pincodeRegionZone: IPincodeRegionZone;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IPincodeRegionZoneUpdateState {
  isNew: boolean;
  regionTypeId: number;
  courierGroupId: number;
  vendorWHCourierMappingId: number;
}

export class PincodeRegionZoneUpdate extends React.Component<IPincodeRegionZoneUpdateProps, IPincodeRegionZoneUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      regionTypeId: 0,
      courierGroupId: 0,
      vendorWHCourierMappingId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRegionTypes();
    this.props.getCourierGroups();
    this.props.getVendorWhCourierMappings();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pincodeRegionZone } = this.props;
      const entity = {
        ...pincodeRegionZone,
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
    this.props.history.push('/entity/pincode-region-zone');
  };

  regionTypeUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        regionTypeId: -1
      });
    } else {
      for (const i in this.props.regionTypes) {
        if (name === this.props.regionTypes[i].name.toString()) {
          this.setState({
            regionTypeId: this.props.regionTypes[i].id
          });
        }
      }
    }
  };

  courierGroupUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        courierGroupId: -1
      });
    } else {
      for (const i in this.props.courierGroups) {
        if (name === this.props.courierGroups[i].name.toString()) {
          this.setState({
            courierGroupId: this.props.courierGroups[i].id
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

  render() {
    const isInvalid = false;
    const { pincodeRegionZone, regionTypes, courierGroups, vendorWHCourierMappings, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-pincode-region-zone-heading">Create or edit a PincodeRegionZone</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pincodeRegionZone} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="regionType.name">Region Type</Label>
                  <AvInput type="select" className="form-control" name="regionTypeId" onChange={this.regionTypeUpdate}>
                    <option value="" key="0" />
                    {regionTypes
                      ? regionTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="courierGroup.name">Courier Group</Label>
                  <AvInput type="select" className="form-control" name="courierGroupId" onChange={this.courierGroupUpdate}>
                    <option value="" key="0" />
                    {courierGroups
                      ? courierGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
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
                <Button tag={Link} id="cancel-save" to="/entity/pincode-region-zone" replace color="info">
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
  regionTypes: storeState.regionType.entities,
  courierGroups: storeState.courierGroup.entities,
  vendorWHCourierMappings: storeState.vendorWHCourierMapping.entities,
  pincodeRegionZone: storeState.pincodeRegionZone.entity,
  loading: storeState.pincodeRegionZone.loading,
  updating: storeState.pincodeRegionZone.updating
});

const mapDispatchToProps = {
  getRegionTypes,
  getCourierGroups,
  getVendorWhCourierMappings,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZoneUpdate);
