import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IProductGroup } from 'app/shared/model/product-group.model';
import { getEntities as getProductGroups } from 'app/entities/product-group/product-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps {
  getEntity: ICrudGetAction<IProduct>;
  updateEntity: ICrudPutAction<IProduct>;
  createEntity: ICrudPutAction<IProduct>;
  getProductGroups: ICrudGetAllAction<IProductGroup>;
  productGroups: IProductGroup[];
  product: IProduct;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IProductUpdateState {
  isNew: boolean;
  productGroupId: number;
}

export class ProductUpdate extends React.Component<IProductUpdateProps, IProductUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productGroupId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProductGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { product } = this.props;
      const entity = {
        ...product,
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
    this.props.history.push('/entity/product');
  };

  productGroupUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        productGroupId: -1
      });
    } else {
      for (const i in this.props.productGroups) {
        if (id === this.props.productGroups[i].id.toString()) {
          this.setState({
            productGroupId: this.props.productGroups[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { product, productGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-product-heading">Create or edit a Product</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : product} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="productGroup.id">Product Group</Label>
                  <AvInput type="select" className="form-control" name="productGroupId" onChange={this.productGroupUpdate}>
                    <option value="" key="0" />
                    {productGroups
                      ? productGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/product" replace color="info">
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
  productGroups: storeState.productGroup.entities,
  product: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating
});

const mapDispatchToProps = {
  getProductGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
