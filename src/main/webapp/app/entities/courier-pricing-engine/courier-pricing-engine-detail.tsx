import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './courier-pricing-engine.reducer';
import { ICourierPricingEngine } from 'app/shared/model/courier-pricing-engine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierPricingEngineDetailProps {
  getEntity: ICrudGetAction<ICourierPricingEngine>;
  courierPricingEngine: ICourierPricingEngine;
  match: any;
}

export class CourierPricingEngineDetail extends React.Component<ICourierPricingEngineDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierPricingEngine } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierPricingEngine [<b>{courierPricingEngine.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="firstBaseWt">First Base Wt</span>
              </dt>
              <dd>{courierPricingEngine.firstBaseWt}</dd>
              <dt>
                <span id="firstBaseCost">First Base Cost</span>
              </dt>
              <dd>{courierPricingEngine.firstBaseCost}</dd>
              <dt>
                <span id="secondBaseWt">Second Base Wt</span>
              </dt>
              <dd>{courierPricingEngine.secondBaseWt}</dd>
              <dt>
                <span id="secondBaseCost">Second Base Cost</span>
              </dt>
              <dd>{courierPricingEngine.secondBaseCost}</dd>
              <dt>
                <span id="additionalWt">Additional Wt</span>
              </dt>
              <dd>{courierPricingEngine.additionalWt}</dd>
              <dt>
                <span id="additionalCost">Additional Cost</span>
              </dt>
              <dd>{courierPricingEngine.additionalCost}</dd>
              <dt>
                <span id="fuelSurcharge">Fuel Surcharge</span>
              </dt>
              <dd>{courierPricingEngine.fuelSurcharge}</dd>
              <dt>
                <span id="minCodCharges">Min Cod Charges</span>
              </dt>
              <dd>{courierPricingEngine.minCodCharges}</dd>
              <dt>
                <span id="codCutoffAmount">Cod Cutoff Amount</span>
              </dt>
              <dd>{courierPricingEngine.codCutoffAmount}</dd>
              <dt>
                <span id="variableCodCharges">Variable Cod Charges</span>
              </dt>
              <dd>{courierPricingEngine.variableCodCharges}</dd>
              <dt>
                <span id="validUpto">Valid Upto</span>
              </dt>
              <dd>
                <TextFormat value={courierPricingEngine.validUpto} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="costParameters">Cost Parameters</span>
              </dt>
              <dd>{courierPricingEngine.costParameters}</dd>
              <dt>Courier</dt>
              <dd>{courierPricingEngine.courierName ? courierPricingEngine.courierName : ''}</dd>
              <dt>Region Type</dt>
              <dd>{courierPricingEngine.regionTypeName ? courierPricingEngine.regionTypeName : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/courier-pricing-engine" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/courier-pricing-engine/${courierPricingEngine.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierPricingEngine }) => ({
  courierPricingEngine: courierPricingEngine.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CourierPricingEngineDetail);
