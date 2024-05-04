package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Sequence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SecuenciaUsuarioRepository extends MongoRepository<Sequence, String> {
}
