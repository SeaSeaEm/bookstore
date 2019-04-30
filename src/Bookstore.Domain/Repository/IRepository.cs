using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bookstore.Domain.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IList<T>> GetAll(params Expression<Func<T, object>>[] navigationProperties);
        Task<IList<T>> GetList(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties);
        T Get(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties);
        void Insert(params T[] items);
        void Update(params T[] items);
        void Delete(params T[] items);
    }
}
