<?php

/**
 * This file is part of the SgDatatablesBundle package.
 *
 * (c) stwe <https://github.com/stwe/DatatablesBundle>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sg\DatatablesBundle\Datatable\Column;

/**
 * Class Column
 *
 * @package Sg\DatatablesBundle\Datatable\Column
 */


use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\PropertyAccess\Exception\InvalidArgumentException;
use Sg\DatatablesBundle\Datatable\Column\AbstractColumn;
use Sg\DatatablesBundle\Datatable\Data\DatatableQuery;

class ColumnChildRow extends AbstractColumn
{
    protected $ajax;

    public function configureOptions(OptionsResolver $resolver){
        $resolver->setDefaults(array(
            'class' => 'details-control',
            'title' => '',
            'ajax' => array('route'=>'', 'args'=>array())
        ));
        $resolver->setAllowedTypes('ajax',array('array','null'));
    }
    /**
     * @inheritDoc
     */
    public function setData($data)
    {
        if(empty($data) || !is_string($data)) throw new InvalidArgumentException('setData(): Expecting non-empty string.');
        $this->data = $data;
        return $this;
    }
    /**
     * @inheritDoc
     */
    public function getData(){
        return $this->data;
    }
    /**
     * @inheritDoc
     */
    public function getTemplate()
    {
        return 'SgDatatablesBundle:Column:childRowColumn.html.twig';
    }
    /**
     * @inheritDoc
     */
    public function getAlias()
    {
        return 'childRowColumn';
    }

    public function setAjax(array $arr){
        $this->ajax = $arr;
        return $this;
    }

    public function getAjax(){
        return $this->ajax;
    }
}
