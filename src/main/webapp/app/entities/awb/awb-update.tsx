import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './awb.reducer';
import { IAwb } from 'app/shared/model/awb.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IAwbUpdateProps {
  getEntity: ICrudGetAction<IAwb>;
  updateEntity: ICrudPutAction<IAwb>;
  createEntity: ICrudPutAction<IAwb>;
  awb: IAwb;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IAwbUpdateState {
  isNew: boolean;
}

export class AwbUpdate extends React.Component<IAwbUpdateProps, IAwbUpdateState> {
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
      const { awb } = this.props;
      const entity = {
        ...awb,
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
    this.props.history.push('/entity/awb');
  };

  render() {
    const isInvalid = false;
    const { awb, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-awb-heading">Create or edit a Awb</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : awb} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="awbNumberLabel" for="awbNumber">
                    Awb Number
                  </Label>
                  <AvField
                    type="text"
                    name="awbNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="awbBarCodeLabel" for="awbBarCode">
                    Awb Bar Code
                  </Label>
                  <AvField
                    type="text"
                    name="awbBarCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="codLabel" check>
                    <AvInput type="checkbox" className="form-control" name="cod" />
                    Cod
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="createDate">
                    Create Date
                  </Label>
                  <AvField
                    type="date"
                    className="form-control"
                    name="createDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="returnAwbNumberLabel" for="returnAwbNumber">
                    Return Awb Number
                  </Label>
                  <AvField type="text" name="returnAwbNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="returnAwbBarCodeLabel" for="returnAwbBarCode">
                    Return Awb Bar Code
                  </Label>
                  <AvField type="text" name="returnAwbBarCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="isBrightAwbLabel" check>
                    <AvInput type="checkbox" className="form-control" name="isBrightAwb" />
                    Is Bright Awb
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/awb" replace color="info">
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
  awb: storeState.awb.entity,
  loading: storeState.awb.loading,
  updating: storeState.awb.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(AwbUpdate);
