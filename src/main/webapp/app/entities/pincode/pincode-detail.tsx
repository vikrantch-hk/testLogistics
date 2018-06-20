import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pincode.reducer';
import { IPincode } from 'app/shared/model/pincode.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PincodeDetail extends React.Component<IPincodeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincodeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Pincode [<b>{pincodeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="pincode">Pincode</span>
            </dt>
            <dd>{pincodeEntity.pincode}</dd>
            <dt>
              <span id="region">Region</span>
            </dt>
            <dd>{pincodeEntity.region}</dd>
            <dt>
              <span id="locality">Locality</span>
            </dt>
            <dd>{pincodeEntity.locality}</dd>
            <dt>
              <span id="lastMileCost">Last Mile Cost</span>
            </dt>
            <dd>{pincodeEntity.lastMileCost}</dd>
            <dt>
              <span id="tier">Tier</span>
            </dt>
            <dd>{pincodeEntity.tier}</dd>
            <dt>City</dt>
            <dd>{pincodeEntity.cityName ? pincodeEntity.cityName : ''}</dd>
            <dt>State</dt>
            <dd>{pincodeEntity.stateName ? pincodeEntity.stateName : ''}</dd>
            <dt>Zone</dt>
            <dd>{pincodeEntity.zoneName ? pincodeEntity.zoneName : ''}</dd>
            <dt>Hub</dt>
            <dd>{pincodeEntity.hubName ? pincodeEntity.hubName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pincode" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/pincode/${pincodeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincode }: IRootState) => ({
  pincodeEntity: pincode.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PincodeDetail);
