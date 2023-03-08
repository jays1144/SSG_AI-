const ManageEvents = ({ match, history }) => {
  const dispatch = useDispatch();

  const { count, page, items } = useSelector(
    ({ event }) => ({
      count: event.count,
      page: event.page,
      itemts: event.items,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(eventActions.getEvents());
  }, []);

  const setPage = useCallback(
    (page) => {
      dispatch(eventActions.getEvents(page));
    },
    [dispatch]
  );

  return (
    <div>
      <EventList events={items} match={match} />
      <Paging page={page} count={count} setPage={setPage} />
    </div>
  );
};

export default ManageEvents;
