import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IProductSourceDestinationMapping } from 'app/shared/model/product-source-destination-mapping.model';
import { getEntity, deleteEntity } from './product-source-destination-mapping.reducer';

export interface IProductSourceDestinationMappingDeleteDialogProps {
  getEntity: ICrudGetAction<IProductSourceDestinationMapping>;
  deleteEntity: ICrudDeleteAction<IProductSourceDestinationMapping>;
  productSourceDestinationMapping: IProductSourceDestinationMapping;
  match: any;
  history: any;
}

export class ProductSourceDestinationMappingDeleteDialog extends React.Component<IProductSourceDestinationMappingDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.productSourceDestinationMapping.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { productSourceDestinationMapping } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this ProductSourceDestinationMapping?</ModalBody>
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

const mapStateToProps = ({ productSourceDestinationMapping }) => ({
  productSourceDestinationMapping: productSourceDestinationMapping.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ProductSourceDestinationMappingDeleteDialog);
