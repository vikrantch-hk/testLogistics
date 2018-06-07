import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './product-group.reducer';
import { IProductGroup } from 'app/shared/model/product-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductGroupDetailProps {
  getEntity: ICrudGetAction<IProductGroup>;
  productGroup: IProductGroup;
  match: any;
}

export class ProductGroupDetail extends React.Component<IProductGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productGroup } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ProductGroup [<b>{productGroup.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{productGroup.name}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/product-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/product-group/${productGroup.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ productGroup }) => ({
  productGroup: productGroup.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupDetail);
