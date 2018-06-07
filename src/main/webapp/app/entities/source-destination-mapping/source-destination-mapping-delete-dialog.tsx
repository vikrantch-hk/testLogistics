import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ISourceDestinationMapping } from 'app/shared/model/source-destination-mapping.model';
import { getEntity, deleteEntity } from './source-destination-mapping.reducer';

export interface ISourceDestinationMappingDeleteDialogProps {
  getEntity: ICrudGetAction<ISourceDestinationMapping>;
  deleteEntity: ICrudDeleteAction<ISourceDestinationMapping>;
  sourceDestinationMapping: ISourceDestinationMapping;
  match: any;
  history: any;
}

export class SourceDestinationMappingDeleteDialog extends React.Component<ISourceDestinationMappingDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.sourceDestinationMapping.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { sourceDestinationMapping } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this SourceDestinationMapping?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp; Cancel
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ sourceDestinationMapping }) => ({
  sourceDestinationMapping: sourceDestinationMapping.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(SourceDestinationMappingDeleteDialog);
