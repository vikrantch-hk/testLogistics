import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier-attributes.reducer';
import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierAttributesDetailProps {
  getEntity: ICrudGetAction<ICourierAttributes>;
  courierAttributes: ICourierAttributes;
  match: any;
}

export class CourierAttributesDetail extends React.Component<ICourierAttributesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierAttributes } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierAttributes [<b>{courierAttributes.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="prepaidAir">Prepaid Air</span>
              </dt>
              <dd>{courierAttributes.prepaidAir ? 'true' : 'false'}</dd>
              <dt>
                <span id="prepaidGround">Prepaid Ground</span>
              </dt>
              <dd>{courierAttributes.prepaidGround ? 'true' : 'false'}</dd>
              <dt>
                <span id="codAir">Cod Air</span>
              </dt>
              <dd>{courierAttributes.codAir ? 'true' : 'false'}</dd>
              <dt>
                <span id="codGround">Cod Ground</span>
              </dt>
              <dd>{courierAttributes.codGround ? 'true' : 'false'}</dd>
              <dt>
                <span id="reverseAir">Reverse Air</span>
              </dt>
              <dd>{courierAttributes.reverseAir ? 'true' : 'false'}</dd>
              <dt>
                <span id="reverseGround">Reverse Ground</span>
              </dt>
              <dd>{courierAttributes.reverseGround ? 'true' : 'false'}</dd>
              <dt>
                <span id="cardOnDeliveryAir">Card On Delivery Air</span>
              </dt>
              <dd>{courierAttributes.cardOnDeliveryAir ? 'true' : 'false'}</dd>
              <dt>
                <span id="cardOnDeliveryGround">Card On Delivery Ground</span>
              </dt>
              <dd>{courierAttributes.cardOnDeliveryGround ? 'true' : 'false'}</dd>
              <dt>
                <span id="hkShipping">Hk Shipping</span>
              </dt>
              <dd>{courierAttributes.hkShipping ? 'true' : 'false'}</dd>
              <dt>
                <span id="vendorShipping">Vendor Shipping</span>
              </dt>
              <dd>{courierAttributes.vendorShipping ? 'true' : 'false'}</dd>
              <dt>
                <span id="reversePickup">Reverse Pickup</span>
              </dt>
              <dd>{courierAttributes.reversePickup ? 'true' : 'false'}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier-attributes" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier-attributes/${courierAttributes.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierAttributes }) => ({
  courierAttributes: courierAttributes.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierAttributesDetail);
