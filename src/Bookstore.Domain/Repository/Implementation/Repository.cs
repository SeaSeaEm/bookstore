using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Bookstore.Domain.Entity;
using Bookstore.Domain.Model;

using Microsoft.EntityFrameworkCore;

namespace Bookstore.Domain.Repository.Implementation
{
    public class Repository<T> : IRepository<T>
        where T : Book
    {
        private readonly IQueryable<T> _dbQuery;
        private readonly ContextEntities _context;

        public Repository(ContextEntities context)
        {
            _dbQuery = context.Set<T>();
            _context = context;
        }

        public async Task<IList<T>> GetAll(params Expression<Func<T, object>>[] navigationProperties)
        {
            // Apply eager loading
            var dbQuery = navigationProperties.Aggregate(_dbQuery,
                (current, navigationProperty) => current.Include(navigationProperty));

            var list = await dbQuery
                .AsNoTracking()
                .ToListAsync();

            return list;
        }

        public async Task<IList<T>> GetList(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        {
            //Apply eager loading
            var dbQuery = navigationProperties.Aggregate(_dbQuery,
                    (current, navigationProperty) => current.Include(navigationProperty));

            var list = await dbQuery
                .AsNoTracking()
                .ToAsyncEnumerable()
                .Where(where)
                .ToList();

            return list;
        }

        public T Get(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        {
            //Apply eager loading
            var dbQuery = navigationProperties.Aggregate(_dbQuery,
                (current, navigationProperty) => current.Include(navigationProperty));

            var item = dbQuery
                .AsNoTracking()
                .FirstOrDefault(where);

            return item;
        }

        public void Insert(params T[] items)
        {
            foreach (var item in items)
                _context.Entry(item).State = EntityState.Added;
        }

        public void Update(params T[] items)
        {
            foreach (var item in items)
                _context.Entry(item).State = EntityState.Modified;
        }

        public void Delete(params T[] items)
        {
            foreach (var item in items)
                _context.Entry(item).State = EntityState.Deleted;
        }
    }
}
