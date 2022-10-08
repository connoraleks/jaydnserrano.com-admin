import {useSortable} from '@dnd-kit/sortable';
import clsx from "clsx";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {forwardRef, memo, useCallback, useRef, useState } from 'react';
import { PhotoAlbum } from 'react-photo-album';

const PhotoFrame = memo(
    forwardRef((props, ref) => {
        const { layoutOptions, imageProps, overlay, active, insertPosition, attributes, listeners } = props;
        const { alt, style, ...restImageProps } = imageProps;

        return (
            <div
                ref={ref}
                style={{
                    width: overlay ? `calc(100% - ${2 * layoutOptions.padding}px)` : style.width,
                    padding: style.padding,
                    marginBottom: style.marginBottom,
                }}
                className={clsx("photo-frame", {
                    overlay: overlay,
                    active: active,
                    insertBefore: insertPosition === "before",
                    insertAfter: insertPosition === "after",
                })}
                {...attributes}
                {...listeners}
            >
                <img
                    loading='lazy'
                    alt={alt}
                    style={{
                        ...style,
                        width: "100%",
                        height: "auto",
                        padding: 0,
                        marginBottom: 0,
                    }}
                    {...restImageProps}
                />
            </div>
        );
    })
);
PhotoFrame.displayName = "PhotoFrame";
const SortablePhotoFrame = (props) => {
    const { photo, activeIndex } = props;
    const { attributes, listeners, isDragging, index, over, setNodeRef } = useSortable({ id: String(photo.id) });

    return (
        <PhotoFrame
            ref={setNodeRef}
            active={isDragging}
            insertPosition={
                activeIndex !== undefined && over?.id === photo.id && !isDragging
                    ? index > activeIndex
                        ? "after"
                        : "before"
                    : undefined
            }
            aria-label="sortable image"
            attributes={attributes}
            listeners={listeners}
            {...props}
        />
    );
};
const Album = ({photoSet, handleClick}) => {
    const [photos, setPhotos] = useState(photoSet);
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragStart = useCallback(({ active }) => setActiveId(active.id), []);
    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setPhotos((photos) => {
                const oldIndex = photos.findIndex((item) => String(item.id) === active.id);
                const newIndex = photos.findIndex((item) => String(item.id) === over.id);
                return arrayMove(photos, oldIndex, newIndex);
            });
        }
    }, []);

    const [activeId, setActiveId] = useState(null);
    const activeIndex = activeId ? photos.findIndex((photo) => photo.id === activeId) : undefined;

    const renderedPhotos = useRef({});
    const renderPhoto = useCallback(
        (props) => {
            // capture rendered photos for future use in DragOverlay
            renderedPhotos.current[props.photo.id] = props;
            return <SortablePhotoFrame activeIndex={activeIndex} {...props} />;
        },
        [activeIndex]
    );
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={photos}>
                <div style={{ margin: 5 }}>
                    <PhotoAlbum photos={photos} layout="rows" renderPhoto={renderPhoto} onClick={(event, photo, index) => handleClick(event,photo,index)}/>
                </div>
            </SortableContext>
            <DragOverlay>{activeId && <PhotoFrame overlay {...renderedPhotos.current[activeId]} />}</DragOverlay>
        </DndContext>
    );
}
export default Album;