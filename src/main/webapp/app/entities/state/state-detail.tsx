import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './state.reducer';
import { IState } from 'app/shared/model/state.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStateDetailProps {
  getEntity: ICrudGetAction<IState>;
  state: IState;
  match: any;
}

export class StateDetail extends React.Component<IStateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { state } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            State [<b>{state.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{state.name}</dd>
              <dt>
                <span id="identifier">Identifier</span>
              </dt>
              <dd>{state.identifier}</dd>
              <dt>
                <span id="unionTerritory">Union Territory</span>
              </dt>
              <dd>{state.unionTerritory ? 'true' : 'false'}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/state" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/state/${state.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  state: state.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(StateDetail);
