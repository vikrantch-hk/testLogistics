import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './product-source-destination-mapping.reducer';
import { IProductSourceDestinationMapping } from 'app/shared/model/product-source-destination-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductSourceDestinationMappingDetailProps {
  getEntity: ICrudGetAction<IProductSourceDestinationMapping>;
  productSourceDestinationMapping: IProductSourceDestinationMapping;
  match: any;
}

export class ProductSourceDestinationMappingDetail extends React.Component<IProductSourceDestinationMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productSourceDestinationMapping } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ProductSourceDestinationMapping [<b>{productSourceDestinationMapping.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details" />
          </Row>
          <Button tag={Link} to="/entity/product-source-destination-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button
            tag={Link}
            to={`/entity/product-source-destination-mapping/${productSourceDestinationMapping.id}/edit`}
            replace
            color="primary"
          >
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ productSourceDestinationMapping }) => ({
  productSourceDestinationMapping: productSourceDestinationMapping.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ProductSourceDestinationMappingDetail);
