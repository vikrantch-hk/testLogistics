import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './awb.reducer';
import { IAwb } from 'app/shared/model/awb.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAwbDetailProps {
  getEntity: ICrudGetAction<IAwb>;
  awb: IAwb;
  match: any;
}

export class AwbDetail extends React.Component<IAwbDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { awb } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Awb [<b>{awb.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="awbNumber">Awb Number</span>
              </dt>
              <dd>{awb.awbNumber}</dd>
              <dt>
                <span id="awbBarCode">Awb Bar Code</span>
              </dt>
              <dd>{awb.awbBarCode}</dd>
              <dt>
                <span id="cod">Cod</span>
              </dt>
              <dd>{awb.cod ? 'true' : 'false'}</dd>
              <dt>
                <span id="createDate">Create Date</span>
              </dt>
              <dd>
                <TextFormat value={awb.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="returnAwbNumber">Return Awb Number</span>
              </dt>
              <dd>{awb.returnAwbNumber}</dd>
              <dt>
                <span id="returnAwbBarCode">Return Awb Bar Code</span>
              </dt>
              <dd>{awb.returnAwbBarCode}</dd>
              <dt>
                <span id="isBrightAwb">Is Bright Awb</span>
              </dt>
              <dd>{awb.isBrightAwb ? 'true' : 'false'}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/awb" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/awb/${awb.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ awb }) => ({
  awb: awb.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(AwbDetail);
