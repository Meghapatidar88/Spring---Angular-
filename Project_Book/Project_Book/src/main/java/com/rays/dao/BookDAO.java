package com.rays.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;

import org.springframework.stereotype.Repository;

import com.rays.dto.BookDTO;

@Repository
public class BookDAO {

    @PersistenceContext
    private EntityManager entityManager;

    // Add book
    public long add(BookDTO dto) {
        entityManager.persist(dto);
        return dto.getId();
    }

    // Update book
    public void update(BookDTO dto) {
        entityManager.merge(dto);
    }

    // Delete book
    public void delete(BookDTO dto) {
        entityManager.remove(entityManager.contains(dto) ? dto : entityManager.merge(dto));
    }

    // Find by primary key
    public BookDTO findByPk(long pk) {
        return entityManager.find(BookDTO.class, pk);
    }

    // Find by unique key (e.g., title or author etc.)
    public BookDTO findByUniqueKey(String attribute, String value) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<BookDTO> cq = builder.createQuery(BookDTO.class);
        Root<BookDTO> root = cq.from(BookDTO.class);

        Predicate condition = builder.equal(root.get(attribute), value);
        cq.where(condition);

        TypedQuery<BookDTO> query = entityManager.createQuery(cq);
        List<BookDTO> list = query.getResultList();

        return list.isEmpty() ? null : list.get(0);
    }

    // Search with filters and pagination
    public List<BookDTO> search(BookDTO dto, int pageNo, int pageSize) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<BookDTO> cq = builder.createQuery(BookDTO.class);
        Root<BookDTO> root = cq.from(BookDTO.class);

        List<Predicate> predicates = new ArrayList<>();

        if (dto != null) {
            if (dto.getTitle() != null && !dto.getTitle().isEmpty()) {
                predicates.add(builder.like(root.get("title"), dto.getTitle() + "%"));
            }
            if (dto.getAuthor() != null && !dto.getAuthor().isEmpty()) {
                predicates.add(builder.like(root.get("author"), dto.getAuthor() + "%"));
            }
            if (dto.getPublisher() != null && !dto.getPublisher().isEmpty()) {
                predicates.add(builder.like(root.get("publisher"), dto.getPublisher() + "%"));
            }
        }

        cq.where(predicates.toArray(new Predicate[0]));

        TypedQuery<BookDTO> query = entityManager.createQuery(cq);

        if (pageSize > 0) {
            query.setFirstResult(pageNo * pageSize);
            query.setMaxResults(pageSize);
        }

        return query.getResultList();
    }

}
