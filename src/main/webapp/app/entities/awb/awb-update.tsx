import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './awb.reducer';
import { IAwb } from 'app/shared/model/awb.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IAwbUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

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
      const { awbEntity } = this.props;
      const entity = {
        ...awbEntity,
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
    const { awbEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testLogisticsApp.awb.home.createOrEditLabel">Create or edit a Awb</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : awbEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="awb-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="awbNumberLabel" for="awbNumber">
                    Awb Number
                  </Label>
                  <AvField
                    id="awb-awbNumber"
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
                    id="awb-awbBarCode"
                    type="text"
                    name="awbBarCode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="codLabel" check>
                    <AvInput id="awb-cod" type="checkbox" className="form-control" name="cod" />
                    Cod
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="createDate">
                    Create Date
                  </Label>
                  <AvField
                    id="awb-createDate"
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
                  <AvField id="awb-returnAwbNumber" type="text" name="returnAwbNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="returnAwbBarCodeLabel" for="returnAwbBarCode">
                    Return Awb Bar Code
                  </Label>
                  <AvField id="awb-returnAwbBarCode" type="text" name="returnAwbBarCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="isBrightAwbLabel" check>
                    <AvInput id="awb-isBrightAwb" type="checkbox" className="form-control" name="isBrightAwb" />
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

const mapStateToProps = (storeState: IRootState) => ({
  awbEntity: storeState.awb.entity,
  loading: storeState.awb.loading,
  updating: storeState.awb.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AwbUpdate);
