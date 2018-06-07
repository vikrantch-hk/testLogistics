import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './city-courier-tat.reducer';
import { ICityCourierTAT } from 'app/shared/model/city-courier-tat.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICityCourierTATUpdateProps {
  getEntity: ICrudGetAction<ICityCourierTAT>;
  updateEntity: ICrudPutAction<ICityCourierTAT>;
  createEntity: ICrudPutAction<ICityCourierTAT>;
  cityCourierTAT: ICityCourierTAT;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICityCourierTATUpdateState {
  isNew: boolean;
}

export class CityCourierTATUpdate extends React.Component<ICityCourierTATUpdateProps, ICityCourierTATUpdateState> {
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
      const { cityCourierTAT } = this.props;
      const entity = {
        ...cityCourierTAT,
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
    this.props.history.push('/entity/city-courier-tat');
  };

  render() {
    const isInvalid = false;
    const { cityCourierTAT, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-city-courier-tat-heading">Create or edit a CityCourierTAT</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cityCourierTAT} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="turnaroundTimeLabel" for="turnaroundTime">
                    Turnaround Time
                  </Label>
                  <AvField type="number" className="form-control" name="turnaroundTime" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/city-courier-tat" replace color="info">
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
  cityCourierTAT: storeState.cityCourierTAT.entity,
  loading: storeState.cityCourierTAT.loading,
  updating: storeState.cityCourierTAT.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CityCourierTATUpdate);
