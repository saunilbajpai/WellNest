package com.example.healthupdate.Repositories;

import com.example.healthupdate.Model.HealthLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthLogRepository extends JpaRepository<HealthLog, Long> {
    List<HealthLog> findByUserIdOrderByDateDesc(int user_id);

    List<HealthLog> findByUserId(int user_id);
}
