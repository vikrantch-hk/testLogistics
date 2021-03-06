import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './product-source-destination-mapping.reducer';
import { IProductSourceDestinationMapping } from 'app/shared/model/product-source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IProductSourceDestinationMappingUpdateProps {
  getEntity: ICrudGetAction<IProductSourceDestinationMapping>;
  updateEntity: ICrudPutAction<IProductSourceDestinationMapping>;
  createEntity: ICrudPutAction<IProductSourceDestinationMapping>;
  productSourceDestinationMapping: IProductSourceDestinationMapping;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IProductSourceDestinationMappingUpdateState {
  isNew: boolean;
}

export class ProductSourceDestinationMappingUpdate extends React.Component<
  IProductSourceDestinationMappingUpdateProps,
  IProductSourceDestinationMappingUpdateState
> {
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
      const { productSourceDestinationMapping } = this.props;
      const entity = {
        ...productSourceDestinationMapping,
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
    this.props.history.push('/entity/product-source-destination-mapping');
  };

  render() {
    const isInvalid = false;
    const { productSourceDestinationMapping, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-product-source-destination-mapping-heading">Create or edit a ProductSourceDestinationMapping</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productSourceDestinationMapping} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <Button tag={Link} id="cancel-save" to="/entity/product-source-destination-mapping" replace color="info">
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
  productSourceDestinationMapping: storeState.productSourceDestinationMapping.entity,
  loading: storeState.productSourceDestinationMapping.loading,
  updating: storeState.productSourceDestinationMapping.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSourceDestinationMappingUpdate);
