import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './source-destination-mapping.reducer';
import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ISourceDestinationMappingUpdateProps {
  getEntity: ICrudGetAction<ISourceDestinationMapping>;
  updateEntity: ICrudPutAction<ISourceDestinationMapping>;
  createEntity: ICrudPutAction<ISourceDestinationMapping>;
  getProducts: ICrudGetAllAction<IProduct>;
  products: IProduct[];
  sourceDestinationMapping: ISourceDestinationMapping;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ISourceDestinationMappingUpdateState {
  isNew: boolean;
  productId: number;
}

export class SourceDestinationMappingUpdate extends React.Component<
  ISourceDestinationMappingUpdateProps,
  ISourceDestinationMappingUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProducts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { sourceDestinationMapping } = this.props;
      const entity = {
        ...sourceDestinationMapping,
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
    this.props.history.push('/entity/source-destination-mapping');
  };

  productUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        productId: -1
      });
    } else {
      for (const i in this.props.products) {
        if (name === this.props.products[i].name.toString()) {
          this.setState({
            productId: this.props.products[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { sourceDestinationMapping, products, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-source-destination-mapping-heading">Create or edit a SourceDestinationMapping</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sourceDestinationMapping} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sourcePincodeLabel" for="sourcePincode">
                    Source Pincode
                  </Label>
                  <AvField
                    type="text"
                    name="sourcePincode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="destinationPincodeLabel" for="destinationPincode">
                    Destination Pincode
                  </Label>
                  <AvField
                    type="text"
                    name="destinationPincode"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="product.name">Product</Label>
                  <AvInput type="select" className="form-control" name="productId" onChange={this.productUpdate}>
                    <option value="" key="0" />
                    {products
                      ? products.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/source-destination-mapping" replace color="info">
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
  products: storeState.product.entities,
  sourceDestinationMapping: storeState.sourceDestinationMapping.entity,
  loading: storeState.sourceDestinationMapping.loading,
  updating: storeState.sourceDestinationMapping.updating
});

const mapDispatchToProps = {
  getProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceDestinationMappingUpdate);
