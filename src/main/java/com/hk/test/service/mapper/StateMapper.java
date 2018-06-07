package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.StateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity State and its DTO StateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StateMapper extends EntityMapper<StateDTO, State> {



    default State fromId(Long id) {
        if (id == null) {
            return null;
        }
        State state = new State();
        state.setId(id);
        return state;
    }
}
